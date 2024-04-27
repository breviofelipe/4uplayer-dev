import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import { Box, Typography, useTheme } from '@mui/material';
import ItemForum from './components/ItemForum';
import { useSelector } from 'react-redux';
import GamerLoading from 'components/gamerLoading/GamerLoading';

function Forum() {
  // { id: 1, title: 'Primeiro Tópico', content: 'Conteúdo do primeiro tópico' },
  //       { id: 2, title: 'Segundo Tópico', content: 'Conteúdo do segundo tópico' },
  //       { id: 3, title: 'Terceiro Tópico', content: 'Conteúdo do terceiro tópico' },
  //       { id: 2, title: 'Quarto Tópico', content: 'Conteúdo do quarto tópico' },
    
    const [topics, setTopics] = useState([])
    const [newTopicTitle, setNewTopicTitle] = useState('');
    const [newTopicContent, setNewTopicContent] = useState('');
    const [hasMore, setHasMore] = useState();
    const [page, setPage] = useState(0);
    const token = useSelector((state) => state.token);
    const [isLoading, setLoading] =  useState(false);

  const url = process.env.REACT_APP_HOST_MEMBERS;
  const handleNewTopicSubmit = async (e) => {
    e.preventDefault();
    const newTopic = {
      titulo: newTopicTitle,
      conteudo: newTopicContent,
    };
    let body = JSON.stringify(newTopic)
    const reponse = await fetch(
      url+`/members/topic`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: body
    }
  );
    const data = await reponse.json();
    setTopics(data.content);
    setNewTopicTitle('');
    setNewTopicContent('');
  };

  const getTopics = async () => {
    setLoading(true);
    
    try{
      const response = await fetch(
        url+`/members/topics?page=${page}&sizePerPage=5`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if(response.ok){      
      const data = await response.json();
      setTopics(data.content)
      setHasMore(data.hasMore)
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTopics();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>{isLoading ? <GamerLoading /> : <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
    <Typography variant='h3'>Fórum</Typography>
    <form onSubmit={handleNewTopicSubmit}>
      <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
          <TextField
          label="Título do Tópico"
          variant="outlined"
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
          />
          <TextField
          label="Conteúdo do Tópico"
          variant="outlined"
          multiline
          rows={4}
          value={newTopicContent}
          onChange={(e) => setNewTopicContent(e.target.value)}
          />
          <Button variant="contained" type="submit">Criar Tópico</Button>
      </Box>
    </form>
    <Box>
      <Typography variant='h4'>Tópicos</Typography>
      <List>
        {topics.map((topic) => (
              <ItemForum topic={topic} />
        ))}
      </List>
      
    </Box>
  </Box>}</>
  );
}

export default Forum;
