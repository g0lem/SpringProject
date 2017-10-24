package com.test.project2;

import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    public ProjectController() throws IOException{
        this.db = new DataBase();
    }


    @RequestMapping(value = "/get/{start}")
    public List<ListItem> get(@PathVariable("start") int start, @RequestBody String query) throws SolrServerException, IOException{


        String str = java.net.URLDecoder.decode(query, "UTF-8");
        str = str.replace(str.substring(str.length()-1), "");

        return this.db.getState(start, 4, str);
    }


    @RequestMapping(value = "/change", method = RequestMethod.PUT)
    public @ResponseBody boolean change(@RequestBody final int request){

        System.out.print(this.data.getList().get(0));

        this.data.getList().get(request).setChecked(!this.data.getList().get(request).getChecked());

        return true;
    }




    @RequestMapping(value="/post", method = RequestMethod.POST)
    public @ResponseBody List<ListItem> post(@RequestBody final ListItem request) throws IOException, SolrServerException{


        this.db.addItem(request);

        this.simpMessagingTemplate.convertAndSend("/topic/greetings", request);


        return this.db.getState(0,4,"*:*");
    }



    @RequestMapping(value="/update/{id}", method = RequestMethod.PUT)
    public @ResponseBody List<ListItem> update(@PathVariable("id") String request) throws IOException, SolrServerException{


//        Stream<ListItem> listItemStream = this.data.getList().stream().filter(listItem -> listItem.id.equals(request.toString()));
//        listItemStream.findFirst().ifPresent(listItem -> listItem.setChecked(!listItem.getChecked()));

        this.db.modifyState("id:"+request);

        this.simpMessagingTemplate.convertAndSend("/topic/greetings", request);


        return this.db.getState(0,4,"*:*");
    }

}
