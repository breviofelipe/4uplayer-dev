import React from 'react';

class PDFViewer extends React.Component {

  render() {
    

    return (
      <div style={{marginBottom: "1rem"}}>
        <iframe src='https://res.cloudinary.com/dosghtja7/image/upload/v1713150670/assets/termos/w1kk7kbvms8qdlx12d5h.pdf' width={"100%"} height={"500px"} />
      </div>
    );
  }
}

export default PDFViewer;
