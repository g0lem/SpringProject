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
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;


@CrossOrigin
@RestController
public class ProjectController {

    State data;
    DataBase db;
    SocketClass socket;

    public ProjectController() throws IOException{
        this.db = new DataBase();
        this.socket = new SocketClass();
    }


    static String readFile(String path, Charset encoding) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get(path));
        return new String(encoded, encoding);
    }

    @RequestMapping(value = "/get/{start}")
    public ResponseEntity<State> get(@PathVariable("start") int start) throws SolrServerException, IOException{

        // SolrDocumentList list = this.db.getState();
        this.data = new State();
        this.data.setList(this.db.getState(start, 4, "*:*"));
        return new ResponseEntity<State>(this.data, HttpStatus.OK);
    }


    @RequestMapping(value = "/search/{start}/{value}")
    public ResponseEntity<State> search(@PathVariable("start") int start, @PathVariable("value") String value) throws SolrServerException, IOException{

        // SolrDocumentList list = this.db.getState();
        this.data = new State();
        this.data.setList(this.db.getState(start, 4, "value:*"+value+"*"));
        return new ResponseEntity<State>(this.data, HttpStatus.OK);
    }


    @RequestMapping(value = "/hello")
    public ResponseEntity<String> hello() throws SolrServerException, IOException{


        return new ResponseEntity<String>("hello", HttpStatus.OK);
    }

    class Req {
        int num;
        int getNum(){
            return this.num;
        }

        Req(){
            this.num = 0;
        }


    }


    @RequestMapping(value = "/change", method = RequestMethod.PUT)
    public @ResponseBody boolean change(@RequestBody final int request){

        System.out.print(this.data.getList().get(0));

        this.data.getList().get(request).setChecked(!this.data.getList().get(request).getChecked());

        return true;
    }



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



    @RequestMapping(value="/post", method = RequestMethod.POST)
    public @ResponseBody List<ListItem> post(@RequestBody final ListItem request) throws IOException, SolrServerException{


        this.data.getList().add(request);

        this.db.addItem(request);


        return this.db.getState(0,4,"*:*");
    }



    @RequestMapping(value="/update/{id}", method = RequestMethod.PUT)
    public @ResponseBody List<ListItem> update(@PathVariable("id") String request) throws IOException, SolrServerException{

        Stream<ListItem> listItemStream = this.data.getList().stream().filter(listItem -> listItem.id.equals(request.toString()));
        listItemStream.findFirst().ifPresent(listItem -> listItem.setChecked(!listItem.getChecked()));

        this.db.modifyState("id:"+request);


        return this.db.getState(0,4,"*:*");
    }

}
