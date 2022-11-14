import { NearestFilter, TextureLoader } from 'three'

import {
	dirtImg,
	grassImg,
	glassImg,
	woodImg,
	logImg,
} from './index'

const dirtTexture = new TextureLoader().load(dirtImg)
dirtTexture.magFilter = NearestFilter
const grassTexture = new TextureLoader().load(grassImg)
grassTexture.magFilter = NearestFilter
const glassTexture = new TextureLoader().load(glassImg)
glassTexture.magFilter = NearestFilter
const woodTexture = new TextureLoader().load(woodImg)
woodTexture.magFilter = NearestFilter
const logTexture = new TextureLoader().load(logImg)
logTexture.magFilter = NearestFilter
const groundTexture = new TextureLoader().load(grassImg)
groundTexture.magFilter = NearestFilter

export {
    dirtTexture,
    grassTexture,
    glassTexture,
    woodTexture,
    logTexture,
    groundTexture
}