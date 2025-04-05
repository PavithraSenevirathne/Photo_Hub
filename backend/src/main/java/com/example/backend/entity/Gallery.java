package com.example.backend.entity;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer galleryId;

    @Column(unique = true)
    private String photoName;
    private String photographerName;
    private String cameraBrand;
    private String description;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GalleryImage> images = new ArrayList<>();

    // Helper method to add images
    public void addImage(GalleryImage image) {
        images.add(image);
        image.setGallery(this);
    }
}