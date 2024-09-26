"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const CARD_IMAGES = [
  'https://i.imgur.com/8kAjg6s.jpeg',  // Pomerania 1
  'https://i.imgur.com/a9BH1DL.png',  // Pomerania 2
  'https://i.imgur.com/kdzmAXI.jpeg',  // Pomerania 3
  'https://i.imgur.com/XcjbFvD.jpeg',  // Pomerania 4
  'https://i.imgur.com/yQvMUrW.jpeg',  // Pomerania 5
  'https://i.imgur.com/JtLumUu.jpeg',  // Pomerania 6
  'https://i.imgur.com/AOtxH4c.jpeg',  // Pomerania 7
  'https://i.imgur.com/QZYvEP4.jpeg',  // Pomerania 8
  'https://i.imgur.com/BomNCJT.jpeg',  // Pomerania 9
  'https://i.imgur.com/WlNaAwo.jpeg',  // Pomerania 10
]

const Confetti = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(50)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-3 bg-blue-500 rounded-full"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              opacity: 1,
            }}
            animate={{
              top: "110%",
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            style={{
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
)

export default function MemoryMatch() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledImages = [...CARD_IMAGES, ...CARD_IMAGES].sort(() => Math.random() - 0.5)
    const newCards = shuffledImages.map((image, index) => ({
      id: index,
      image,
      flipped: false,
      matched: false,
    }))
    setCards(newCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setShowConfetti(false)
  }

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return
    if (cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    setFlippedCards((prev) => [...prev, id])

    if (flippedCards.length === 1) {
      if (cards[flippedCards[0]].image === newCards[id].image) {
        newCards[flippedCards[0]].matched = true
        newCards[id].matched = true
        setCards(newCards)
        setMatchedPairs((prev) => {
          const newMatchedPairs = prev + 1
          if (newMatchedPairs === CARD_IMAGES.length) {
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 5000)
          }
          return newMatchedPairs
        })
        setFlippedCards([])
      } else {
        setTimeout(() => {
          newCards[flippedCards[0]].flipped = false
          newCards[id].flipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex items-center p-4">
      <Confetti isVisible={showConfetti} />
      <div className="bg-white rounded-xl shadow-2xl p-4 w-full h-full flex flex-col">
        <div className="text-center mb-4">
          <h2 className="text-3xl mb-2 text-purple-600">Juega con Pom</h2>
          <Button 
            size="sm" 
            onClick={initializeGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-1 px-4 rounded-full"
          >
            <Shuffle className="mr-2 h-4 w-4" /> Nueva partida
          </Button>
        </div>

        <motion.div 
          className="grid grid-cols-5 gap-2 flex-grow overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className={`aspect-square flex items-center justify-center cursor-pointer rounded-lg shadow-md ${
                card.flipped || card.matched ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-gradient-to-br from-gray-200 to-gray-300'
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              {card.flipped || card.matched ? (
                <img src={card.image} alt="Pomerania" className="w-[90%] h-[90%] object-cover rounded-lg" />
              ) : (
                <span className="text-2xl font-bold text-white">?</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-4 text-center">
          <p className="text-xl text-purple-600">
            Poms encontrados: {matchedPairs} / {CARD_IMAGES.length}
          </p>
          {matchedPairs === CARD_IMAGES.length && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-green-500 mt-2"
            >
              ¡Felicidades! Has encontrado todos los Poms
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}