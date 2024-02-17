import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme_info.css";
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "28f585661ee77c9dc2295b092f5cb9db",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("Elemento desmodificado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhalista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhalista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Este filme já está na sua lista")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme Salvo com Sucesso!")
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>ACESSANDO FILME {id}</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button >
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailler`}
          >
            Trailler
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
