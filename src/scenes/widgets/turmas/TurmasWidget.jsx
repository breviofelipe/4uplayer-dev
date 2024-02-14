import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurmas } from "state";
import TurmaWidget from "./TurmaWidget";

const TurmasWidget = () => {
  const dispatch = useDispatch();
  const turmas = useSelector((state) => state.turmas);
  const token = useSelector((state) => state.token);


  const getTurmas = async () => {
    const url = "https://arcane-thicket-81092-1ac7cecea9b8.herokuapp.com/turmas";
    // const url = "http://localhost:5000/turmas";

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setTurmas({ turmas: data }));
  };

  useEffect(() => {
    getTurmas();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <> { turmas.map(
        ({  id,
            turmaId,
            atores,
            espetaculo,
          }) => (
          <TurmaWidget
            key={id}
            idTurma={id}
            turmaId={turmaId}
            atores={atores}
            espetaculo={espetaculo}
          />
        )
      )
      }
    </>
  );
};

export default TurmasWidget;
