import UI from '@/components/UI/UI'
import { Box, Container, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { AppProvider } from '@/components/Context'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


import Chara from '../public/character.gif';
import Background from '../public/background.jpg';
import Text from '../public/text.png';

import Face1 from '../public/Face1.png';
import Face2 from '../public/Face2.png';
import Face3 from '../public/Face3.png';
import Face4 from '../public/Face4.png';
import Face5 from '../public/Face5.png';
import Face6 from '../public/Face6.png';

import React from 'react'
import dynamic from 'next/dynamic'
//import Sketch from 'react-p5'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false
})



const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}
const theme = extendTheme({ colors })

const Hood: NextPage = () => {

let char
let backgroundI
let textI
let Faces = []
let speed = 2
let directions = []
let positions = []
let sizes = []
let rotations = []
const preload = (p5) => {
	backgroundI = p5.loadImage(Background.src)
	char = p5.loadImage(Chara.src)
	textI = p5.loadImage(Text.src)
	Faces = [p5.loadImage(Face1.src),
	p5.loadImage(Face2.src),
	p5.loadImage(Face3.src),
	p5.loadImage(Face4.src),
	p5.loadImage(Face5.src),
	p5.loadImage(Face6.src)
	]
	sizes = [
	p5.random(1/8,1/6),
	p5.random(1/8,1/6),
	p5.random(1/8,1/6),
	p5.random(1/8,1/6),
	p5.random(1/8,1/6),
	p5.random(1/8,1/6),
	]
	rotations = [
	p5.random(p5.TWO_PI),
	p5.random(p5.TWO_PI),
	p5.random(p5.TWO_PI),
	p5.random(p5.TWO_PI),
	p5.random(p5.TWO_PI),
	p5.random(p5.TWO_PI),
	]
	directions = [
	p5.createVector(p5.random(speed/2,speed),p5.random(speed/2,speed)),
	p5.createVector(p5.random(speed/2,speed),p5.random(speed/2,speed)),
	p5.createVector(p5.random(speed/2,speed),p5.random(speed/2,speed)),
	p5.createVector(p5.random(speed/2,speed),p5.random(speed/2,speed)),
	p5.createVector(p5.random(speed/2,speed),p5.random(speed/2,speed)),
	p5.createVector(p5.random(speed/2,speed),p5.random(speed/2,speed))
	]
	
}

const setup = (p5, parentRef) => {
	document.body.style.margin = "0px"
	p5.createCanvas(innerWidth, innerHeight*0.9).parent(parentRef)
	console.log("Machi")
	positions = [
	p5.createVector(p5.random(p5.width),p5.random(p5.height)),
	p5.createVector(p5.random(p5.width),p5.random(p5.height)),
	p5.createVector(p5.random(p5.width),p5.random(p5.height)),
	p5.createVector(p5.random(p5.width),p5.random(p5.height)),
	p5.createVector(p5.random(p5.width),p5.random(p5.height)),
	p5.createVector(p5.random(p5.width),p5.random(p5.height))
	]
}

const correctSize = (p5,img,factor,cond) => {
	let imgH = p5.height*factor
	let imgW = imgH*img.width/img.height
	if(cond == "<" ? imgW<p5.width : imgW>p5.width){
		imgW = p5.width*factor
		imgH = imgW*img.height/img.width
	}
	return [imgW,imgH]
}

const draw = (p5) => {

let sizeX = 0;
let sizeY = 0;
p5.background(0)
sizeX = correctSize(p5,backgroundI,1,"<")[0]
sizeY = correctSize(p5,backgroundI,1,"<")[1]
p5.image(backgroundI,p5.width/2 - sizeX/2,p5.height/2 - sizeY/2,sizeX,sizeY)


sizeX = correctSize(p5,textI,3.5/4,">")[0]
sizeY = correctSize(p5,textI,3.5/4,">")[1]

let sizeYs = sizeY
sizeX = correctSize(p5,char,3/4,">")[0]
sizeY = correctSize(p5,char,3/4,">")[1]
p5.image(char,p5.width/2 - sizeX/2,sizeYs,sizeX,sizeY)

char.play()
for(let i = 0; i < Faces.length; i++){
	sizeX = correctSize(p5,Faces[i],sizes[i],">")[0]
	sizeY = correctSize(p5,Faces[i],sizes[i],">")[1]	
	p5.push()
	p5.translate(positions[i].x,positions[i].y)
	p5.rotate(rotations[i])
	p5.image(Faces[i],- sizeX/2, - sizeY/2,sizeX,sizeY)
	p5.pop()
	positions[i] = p5.createVector(positions[i].x+directions[i].x,positions[i].y+directions[i].y)
	if(positions[i].x < 0 || positions[i].x > p5.width){directions[i] = p5.createVector(-directions[i].x,directions[i].y); sizes[i] = p5.random(1/8,1/6); rotations[i] = p5.random(p5.TWO_PI);}
	if(positions[i].y < 0 || positions[i].y > p5.height) {directions[i] = p5.createVector(directions[i].x,-directions[i].y); sizes[i] = p5.random(1/8,1/6); rotations[i] = p5.random(p5.TWO_PI);}
}
sizeX = correctSize(p5,textI,3.5/4,">")[0]
sizeY = correctSize(p5,textI,3.5/4,">")[1]
p5.image(textI,p5.width/2 - sizeX/2,p5.height/20,sizeX,sizeY)
}


return (
<ChakraProvider theme={theme}>
  <AppProvider>
	<Box>
	  <UI>
		<Sketch setup={setup} preload={preload} draw={draw} />
	  </UI>
	</Box>
  </AppProvider>
</ChakraProvider>
)
}
export default Hood
