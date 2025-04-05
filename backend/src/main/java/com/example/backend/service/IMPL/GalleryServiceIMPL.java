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


//    @Override
//    public List<GalleryDTO> getAllGalleries() {
//        List<Gallery> galleries = galleryRepo.findAll();
//        return galleries.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    // Helper method to convert Gallery entity to GalleryDTO
//    private GalleryDTO convertToDTO(Gallery gallery) {
//        GalleryDTO dto = new GalleryDTO();
//        dto.setGalleryId(gallery.getGalleryId());
//        dto.setPhotoName(gallery.getPhotoName());
//        dto.setPhotographerName(gallery.getPhotographerName());
//        dto.setCameraBrand(gallery.getCameraBrand());
//        dto.setDescription(gallery.getDescription());
//
//        // Handle the images - decide if you want to return the image data in the DTO
//        // This might cause performance issues with large galleries
//        if (gallery.getImages() != null && !gallery.getImages().isEmpty()) {
//            dto.setImageData(gallery.getImages().stream()
//                    .map(GalleryImage::getData)
//                    .collect(Collectors.toList()));
//        }
//
//        return dto;
//    }

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


//    @Override
//    public String addGalleryWithImage(GalleryDTO galleryDTO, MultipartFile imageFile) {
//        // Validate image file
//        if (imageFile == null || imageFile.isEmpty()) {
//            return "Image file is required.";
//        }
//
//        // Check if photo name already exists (optional validation - remove if not needed)
////        if (galleryRepo.findByPhotoName(galleryDTO.getPhotoName()) != null) {
////            return "Photo name already exists. Please use a different name.";
////        }
//
//        // Map GalleryDTO to Gallery entity
//        Gallery gallery = new Gallery();
//        gallery.setPhotoName(galleryDTO.getPhotoName());
//        gallery.setPhotographerName(galleryDTO.getPhotographerName());
//        gallery.setCameraBrand(galleryDTO.getCameraBrand());
//        gallery.setDescription(galleryDTO.getDescription());
//
//        // Save image as a byte array
//        try {
//            List<byte[]> images = new ArrayList<>();
//            images.add(imageFile.getBytes());
//            gallery.setImages(images);
//        } catch (IOException e) {
//            return "Failed to process image: " + e.getMessage();
//        }
//
//        // Save the gallery entity to the database
//        galleryRepo.save(gallery);
//        return "Gallery '" + galleryDTO.getPhotoName() + "' saved successfully with image.";
//    }


}
