package com.test.project2;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.impl.XMLResponseParser;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrException;
import org.apache.solr.common.SolrInputDocument;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class DataBase {

    String urlString;
    HttpSolrClient solr;

    public DataBase(){

        this.urlString = "http://localhost:8983/solr/todo.app";
        this.solr = new HttpSolrClient.Builder(urlString).build();
        this.solr.setParser(new XMLResponseParser());

    }

    public void addState(State state) throws SolrServerException, IOException{


       solr.deleteByQuery("*:*");

        for(int i=0; i<state.getList().size(); i++){
            ListItem item = state.getList().get(i);

            SolrInputDocument document = new SolrInputDocument();
            document.addField("value", item.getValue());
            document.addField("checked", item.getChecked());
            this.solr.add(document);
            this.solr.commit();

        }


    }



    public List<ListItem> getState() throws IOException, SolrServerException{


        SolrQuery query = new SolrQuery();
        query.set("q", "*:*");
        QueryResponse response = this.solr.query(query);
        SolrDocumentList docList = response.getResults();

        List<ListItem> res = new ArrayList<ListItem>();

        for(int i=0;i<docList.size();i++){
            ListItem list_item = new ListItem();
            list_item.checked = (Boolean) (docList.get(i).getFieldValue("checked"));
            list_item.value   = (String) (docList.get(i).getFieldValue("value"));
            res.add(list_item);
        }



        return res;
    }




}
