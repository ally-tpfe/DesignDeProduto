import React from 'react'

export default function HomePage() {
  return (
    <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'none'}}>
      <div
      style={{
        width: '90%',
        height: '95%',
      }}
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://forms.office.com/Pages/ResponsePage.aspx?id=LQk60F6FL0-mzQsChVWgDzwCPbS5z69HnEsqdbKhoB5UMktXRTJYQUhBUDkxTTlFRkhIV0s3SVYwTi4u&embed=true" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>`
      }}
    />
      </div>
  )
}
