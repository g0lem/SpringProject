package com.test.project2;

import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ProjectController {

    State data;
    DataBase db;

    public ProjectController(){
        this.db = new DataBase();
    }


    static String readFile(String path, Charset encoding) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get(path));
        return new String(encoded, encoding);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/get")
    public ResponseEntity<State> get() throws SolrServerException, IOException{

       // SolrDocumentList list = this.db.getState();
        this.data = new State();
        this.data.setList(this.db.getState());
        return new ResponseEntity<State>(this.data, HttpStatus.OK);
    }

    class req {
        int num;
        int getNum(){
            return this.num;
        }


    }
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/change", method = RequestMethod.POST)
    public @ResponseBody boolean change(@RequestBody final req request) throws IOException{

        System.out.print(this.data.getList().get(0));

        this.data.getList().get(request.getNum()).setChecked(!this.data.getList().get(request.getNum()).getChecked());

        return true;
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
    public @ResponseBody boolean post(@RequestBody final State request) throws IOException, SolrServerException{


        this.data = request;

        this.db.addState(this.data);

        return true;
    }
}
