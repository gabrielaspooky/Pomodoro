"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Shuffle, X } from "lucide-react"

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

export default function MemoryMatch() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  // Eliminamos la línea: const [isGameModalOpen, setIsGameModalOpen] = useState(false)

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
        setMatchedPairs((prev) => prev + 1)
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-6 text-purple-600">Juega con Pom</h2>
        <Button size="lg" onClick={initializeGame} className="bg-purple-500 hover:bg-purple-600 text-white">
          <Shuffle className="mr-2 h-5 w-5" /> Nueva partida
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-20 h-20 flex items-center justify-center cursor-pointer rounded-xl transition-all duration-300 shadow-md ${
              card.flipped || card.matched ? 'bg-purple-500' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped || card.matched ? (
              <img src={card.image} alt="Pomerania" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <span className="text-2xl font-bold text-purple-600">?</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-xl font-semibold text-purple-600">
        Poms encontrados: {matchedPairs} / {CARD_IMAGES.length}
      </div>
    </div>
  )
}
