package com.test.project2;

import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sun.text.normalizer.UTF16;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
public class ProjectController {

    State data;


    static String readFile(String path, Charset encoding) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get(path));
        return new String(encoded, encoding);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/get")
    public ResponseEntity<State> get() {

        return new ResponseEntity<State>(this.data, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value="/", method = RequestMethod.GET)
    public byte[] something() throws IOException{

        //File f = new File("index.html");

        Path path = Paths.get("src/index.html");
        byte[] data = Files.readAllBytes(path);
//        String response = "";
//
//        try {
//            response = this.readFile("index.html", Charset.defaultCharset());
//            return response;
//        }
//        finally {
//            return response;
//        }
        return data;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value="/post", method = RequestMethod.POST)
    public @ResponseBody boolean post(@RequestBody final State request) throws IOException{

        System.out.print(request.getValue());
        System.out.print(request.getList());

        this.data = request;

        return true;
    }
}
