package com.userauthentication.payload.response;

import lombok.Data;
import java.util.List;

@Data
public class  UserInfoResponse {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private List<String> roles;

    /*
     *** Constructor
     */
    public UserInfoResponse(Long id, String username, String firstname, String lastname, String email, List<String> roles) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}