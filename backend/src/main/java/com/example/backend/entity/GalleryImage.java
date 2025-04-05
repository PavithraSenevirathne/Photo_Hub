package com.example.backend.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(length = 16777215) // Adjust size as needed
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "gallery_id")
    private Gallery gallery;
}