import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" });
		return result.secure_url;
	} catch (error) {
		throw new Error("Error uploading to cloudinary");
	}
};

export const createSong = async (req, res, next) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile)
			return res.status(400).json({ message: "Please upload all files" });

		const { title, artist, albumId, duration } = req.body;
		const audioUrl = await uploadToCloudinary(req.files.audioFile);
		const imageUrl = await uploadToCloudinary(req.files.imageFile);

		const song = new Song({ title, artist, audioUrl, imageUrl, duration, albumId: albumId || null });
		await song.save();

		if (albumId) await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
		res.status(201).json(song);
	} catch (error) {
		next(error);
	}
};

export const deleteSong = async (req, res, next) => {
	try {
		const song = await Song.findById(req.params.id);
		if (song.albumId) await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
		await Song.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const imageUrl = await uploadToCloudinary(req.files.imageFile);
		const album = new Album({ title, artist, imageUrl, releaseYear });
		await album.save();
		res.status(201).json(album);
	} catch (error) {
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		await Song.deleteMany({ albumId: req.params.id });
		await Album.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		next(error);
	}
};

export const checkAdmin = async (req, res) => {
	res.status(200).json({ admin: true });
};
