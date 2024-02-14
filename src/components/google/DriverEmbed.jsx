import "./DriverEmbed.css"
const DriverEmbed = ({embedId}) => {
    return <div className="drive-responsive">
        <iframe  
        src={`https://drive.google.com/file/d/${embedId}/preview`}
        allowFullScreen
        title="Embedded documentos" width="640" height="780"></iframe>
    </div>
}

export default DriverEmbed;