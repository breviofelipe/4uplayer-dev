import { Typography, useTheme } from '@mui/material';
import './TaskItem.css'
import { NavLink } from 'react-router-dom'
export default function TaskItem ({ task }) {
  const style = { '--i': 3, '--color': task?.cor };
  const { palette } = useTheme();
  return <NavLink className='navlink' to='card-tarefa' state={{ task }} >
              <div className='listaTarefas'>
                <li style={style}>
                <Typography
                    color={palette.neutral.dark}
                    variant="h4"
                    fontWeight="500"
                    sx={{ mb: "1.5rem" }}
                  >
                    {task?.titulo}
                  </Typography>
                  <Typography color={palette.neutral.medium} fontSize="1rem">
                    {task?.descricao}
                  </Typography>               
                </li>
              </div>
            </NavLink>  
}
