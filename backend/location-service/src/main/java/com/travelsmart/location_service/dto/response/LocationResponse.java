package com.travelsmart.location_service.dto.response;

import com.travelsmart.location_service.entity.Address;
import com.travelsmart.location_service.entity.LocationImageEntity;
import com.travelsmart.location_service.utils.StringListConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class LocationResponse {
    private Long place_id;
    private String category;
    private String display_name;
    private String lon;
    private String lat;
    private String name;
    private String type;
    private Address address;
    private LocationImageResponse thumbnail;
    private Set<LocationImageResponse> collections;
    private List<String> boundingbox;
}
