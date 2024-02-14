import "./MemoryIframe.css";

const MemoryIframe = () => {
    return <div className="game-responsive">
    <iframe src={`https://trismemory.vercel.app/`}
      allowFullScreen
      title="Embedded game memory" ></iframe>
  </div>
}

export default MemoryIframe;