package com.example.backend.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryDTO {
    private Integer galleryId;
    private String photoName;
    private String photographerName;
    private String cameraBrand;
    private String description;
    // We'll use this for responses, not for saving
    private List<byte[]> imageData;

    public void setImages(List<byte[]> imageDataList) {
    }
}