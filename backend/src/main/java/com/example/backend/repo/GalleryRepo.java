package com.example.backend.repo;

import com.example.backend.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepo extends JpaRepository<Gallery,Integer> {

}
