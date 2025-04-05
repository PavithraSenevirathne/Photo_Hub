package com.example.backend.controller;

import com.example.backend.DTO.GalleryDTO;
import com.example.backend.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/gallery")
@CrossOrigin
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

//    @PostMapping("/save")
//    public String addGallery(@RequestParam("photoName") String photoName,
//                             @RequestParam("photographerName") String photographerName,
//                             @RequestParam("cameraBrand") String cameraBrand,
//                             @RequestParam("description") String description,
//                             @RequestParam("image") MultipartFile imageFile) {
//
//        // Create GalleryDTO from individual parameters
//        GalleryDTO galleryDTO = new GalleryDTO();
//        galleryDTO.setPhotoName(photoName);
//        galleryDTO.setPhotographerName(photographerName);
//        galleryDTO.setCameraBrand(cameraBrand);
//        galleryDTO.setDescription(description);
//
//        // Call service to save gallery with image
//        return galleryService.addGalleryWithImage(galleryDTO, imageFile);
//    }


    @PostMapping("/save")
    public String addGallery(@RequestParam("photoName") String photoName,
                             @RequestParam("photographerName") String photographerName,
                             @RequestParam("cameraBrand") String cameraBrand,
                             @RequestParam("description") String description,
                             @RequestParam("images") MultipartFile[] imageFiles) {

        // Create GalleryDTO from individual parameters
        GalleryDTO galleryDTO = new GalleryDTO();
        galleryDTO.setPhotoName(photoName);
        galleryDTO.setPhotographerName(photographerName);
        galleryDTO.setCameraBrand(cameraBrand);
        galleryDTO.setDescription(description);

        // Call service to save gallery with multiple images
        return galleryService.addGalleryWithImages(galleryDTO, imageFiles);
    }

    @GetMapping("/all")
    public List<GalleryDTO> getAllGalleries() {
        return galleryService.getAllGalleries();
    }


}
