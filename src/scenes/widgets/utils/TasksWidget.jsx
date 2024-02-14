  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setTasks } from "state";
import TaskItem from "../../../components/item/TaskItem";
import WidgetWrapper from "components/WidgetWrapper";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
  
  const TaskSWidget = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const tasks = useSelector((state) => state.tasks);

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    
  
    const getTasks = async () => {
      const response = await fetch(`https://hidden-beach-56074-0fd939fd2f6c.herokuapp.com/task/consultar`, {
        method: "GET",
        headers: {
          //Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      dispatch(setTasks({ tasks: data }));
    };

    useEffect(() => {
        getTasks();
    }, []);
  
    return (<WidgetWrapper mobile={!isNonMobileScreens} >
      <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >Tarefas
       </Typography>
       <div style={{ 
        '--length': 5,
        'list-style': 'none',
	    'counter-reset': 'list'
        }} role="list">
            {tasks && tasks.map((task) => {
              return <TaskItem key={task.id} task={task} />
            })}
            </div>
            </WidgetWrapper>
      
    );
  };
  
  export default TaskSWidget;
  