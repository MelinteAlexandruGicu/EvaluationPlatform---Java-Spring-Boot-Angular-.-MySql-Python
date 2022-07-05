package com.managefiles.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFileQuiz {
    private Long id;
    private String name;
    private String url;
    private String type;
    private String content;
    private long size;

}
