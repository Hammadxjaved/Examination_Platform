import React from 'react'
import NavBar from '../../components/layouts/NavBar';
import CodeEditor from '../../components/CodeEditor';
import FullscreenHandler from '../../components/layouts/FullscreenHandler';


export default function About() {
  return (
    <div style={{backgroundColor:'#101010'}}>
      <NavBar />
      <FullscreenHandler />
      <CodeEditor/>
    </div>
  );
}
