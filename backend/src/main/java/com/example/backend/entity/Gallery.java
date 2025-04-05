package com.example.backend.entity;

import javax.persistence.Entity;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Gallery")
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonType.class)
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gallery_id")
    private Integer galleryId;


    @Column(name = "photo_name")
    private String photoName;

    @Column(name = "photographer_name")
    private String photographerName;

    @Column(name = "camera_brand")
    private String cameraBrand;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Type(type = "json")
    @Column(name = "images", columnDefinition = "json")
    private List<byte[]> images;


}
