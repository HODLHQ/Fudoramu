import React from 'react'
import dynamic from 'next/dynamic'
//import Sketch from 'react-p5'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false
})

const Landing = () => {
  y = 0
  let direction = '^'
	
  const setup = (p5, parentRef) => {
	//document.body.style.margin = "0px"
    //p5.createCanvas().parent(parentRef)
	
  }

  const draw = (p5) => {
   /* p5.background(0)
    p5.fill(255, y * 1.3, 0)
    p5.ellipse(p5.width / 2, y, 50)
    if (y > p5.height) direction = ''
    if (y < 0) {
      direction = '^'
    }
    if (direction === '^') y += 8
    else y -= 4*/
  }

  return (
  <div style={{width: '100%', margin:'0', padding:'0'}}>
   
	</div>
  )
}

export default Landing
