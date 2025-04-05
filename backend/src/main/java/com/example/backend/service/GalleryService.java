package com.example.backend.service;

import com.example.backend.DTO.GalleryDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {



//    String addGalleryWithImage(GalleryDTO galleryDTO, MultipartFile imageFile);

    String addGalleryWithImages(GalleryDTO galleryDTO, MultipartFile[] imageFiles);

    List<GalleryDTO> getAllGalleries();
}
