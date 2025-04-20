package com.example.backend.service.IMPL;

import com.example.backend.DTO.GalleryDTO;
import com.example.backend.entity.Gallery;
import com.example.backend.entity.GalleryImage;
import com.example.backend.repo.GalleryRepo;
import com.example.backend.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GalleryServiceIMPL implements GalleryService {

    @Autowired
    private GalleryRepo galleryRepo;

    @Override
    public String addGalleryWithImages(GalleryDTO galleryDTO, MultipartFile[] imageFiles) {
        // Validate image files
        if (imageFiles == null || imageFiles.length == 0) {
            return "At least one image file is required.";
        }

        // Check if photo name already exists
        // Assuming the repository method returns a boolean or an Optional<Gallery>
        if (galleryRepo.existsByPhotoName(galleryDTO.getPhotoName())) {
            return "Photo name already exists. Please use a different name.";
        }

        // Map GalleryDTO to Gallery entity
        Gallery gallery = new Gallery();
        gallery.setPhotoName(galleryDTO.getPhotoName());
        gallery.setPhotographerName(galleryDTO.getPhotographerName());
        gallery.setCameraBrand(galleryDTO.getCameraBrand());
        gallery.setDescription(galleryDTO.getDescription());

        // Process and add images
        try {
            // Process up to 4 images
            int maxImages = Math.min(imageFiles.length, 4);
            for (int i = 0; i < maxImages; i++) {
                if (!imageFiles[i].isEmpty()) {
                    GalleryImage image = new GalleryImage();
                    image.setData(imageFiles[i].getBytes());
                    gallery.addImage(image);
                }
            }

            if (gallery.getImages().isEmpty()) {
                return "No valid images were provided.";
            }

        } catch (IOException e) {
            return "Failed to process images: " + e.getMessage();
        }

        // Save the gallery entity to the database
        Gallery savedGallery = galleryRepo.save(gallery);
        return "Gallery '" + galleryDTO.getPhotoName() + "' saved successfully with " +
                savedGallery.getImages().size() + " images.";
    }



    @Override
    public List<GalleryDTO> getAllGalleries() {
        List<Gallery> galleryList = galleryRepo.findAll();
        if (galleryList.isEmpty()) {
            throw new RuntimeException("No galleries found.");
        }

        // Convert Gallery entities to GalleryDTOs
        List<GalleryDTO> galleryDTOList = new ArrayList<>();
        for (Gallery gallery : galleryList) {
            GalleryDTO galleryDTO = new GalleryDTO();
            galleryDTO.setGalleryId(gallery.getGalleryId());
            galleryDTO.setPhotoName(gallery.getPhotoName());
            galleryDTO.setPhotographerName(gallery.getPhotographerName());
            galleryDTO.setCameraBrand(gallery.getCameraBrand());
            galleryDTO.setDescription(gallery.getDescription());

            // Convert image entities to byte arrays
            if (gallery.getImages() != null && !gallery.getImages().isEmpty()) {
                List<byte[]> imageDataList = new ArrayList<>();
                for (GalleryImage image : gallery.getImages()) {
                    imageDataList.add(image.getData());
                }
                galleryDTO.setImages(imageDataList);
            }

            galleryDTOList.add(galleryDTO);
        }

        return galleryDTOList;
    }

    @Override
    public String deleteGallery(Integer galleryId) {
        // Check if gallery exists
        Gallery gallery = galleryRepo.findById(galleryId)
                .orElseThrow(() -> new RuntimeException("Gallery not found with id: " + galleryId));

        // Get gallery name for the response message
        String photoName = gallery.getPhotoName();

        // Delete the gallery (this will cascade to delete associated images due to our relationship setup)
        galleryRepo.deleteById(galleryId);

        return "Gallery '" + photoName + "' has been successfully deleted.";
    }

    @Override
    public String updateGalleryWithImages(Integer galleryId, GalleryDTO galleryDTO, MultipartFile[] imageFiles) {
        // Check if the gallery exists
        Gallery existingGallery = galleryRepo.findById(galleryId)
                .orElseThrow(() -> new RuntimeException("Gallery not found with ID: " + galleryId));

        // Update gallery details - only update fields that are not null in the DTO
        if (galleryDTO.getPhotoName() != null) {
            existingGallery.setPhotoName(galleryDTO.getPhotoName());
        }
        if (galleryDTO.getPhotographerName() != null) {
            existingGallery.setPhotographerName(galleryDTO.getPhotographerName());
        }
        if (galleryDTO.getCameraBrand() != null) {
            existingGallery.setCameraBrand(galleryDTO.getCameraBrand());
        }
        if (galleryDTO.getDescription() != null) {
            existingGallery.setDescription(galleryDTO.getDescription());
        }

        // Update images if new ones are provided
        if (imageFiles != null && imageFiles.length > 0) {
            try {
                // First clear existing images if needed (or implement your merge strategy)
                existingGallery.getImages().clear();

                // Add new images
                for (MultipartFile imageFile : imageFiles) {
                    if (!imageFile.isEmpty()) {
                        GalleryImage galleryImage = new GalleryImage();
                        galleryImage.setImageData(imageFile.getBytes());
                        existingGallery.addImage(galleryImage);
                    }
                }
            } catch (IOException e) {
                return "Failed to update images: " + e.getMessage();
            }
        }

        // Save the updated gallery
        galleryRepo.save(existingGallery);

        return "Gallery '" + galleryDTO.getPhotoName() + "' updated successfully.";
    }


}
