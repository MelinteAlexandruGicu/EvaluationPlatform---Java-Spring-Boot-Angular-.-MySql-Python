package com.userauthentication.payload.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private List<String> roles;

    /*
     *** Constructor
     */
    public JwtResponse(String accessToken,
                       Long id,
                       String username,
                       String email,
                       List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    /*
     *** Constructor
     */
    public JwtResponse(String accessToken,
                       Long id,
                       String username,
                       String firstname,
                       String lastname,
                       String email,
                       List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}