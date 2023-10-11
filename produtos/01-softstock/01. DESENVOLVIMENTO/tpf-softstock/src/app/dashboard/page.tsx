import React from 'react'

export default function HomePage() {
  return (
    <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'none'}}>
      <iframe 
      title="Gestao de Softwares e Licenças" 
      width="85%" 
      height="96.5%" src="https://app.powerbi.com/view?r=eyJrIjoiNTY2MjA3MjctODM4Mi00NTAxLWEyNzYtNTI3M2M1Mjk0NDZhIiwidCI6ImQwM2EwOTJkLTg1NWUtNGYyZi1hNmNkLTBiMDI4NTU1YTAwZiJ9"  
      allowFullScreen={true}
      ></iframe>
    </div>
  )
}
