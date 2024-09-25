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
    <>
      {/* Eliminamos el botón y el modal externo */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Juega con Pom</h2>
        <Button size="sm" onClick={initializeGame}>
          <Shuffle className="mr-2 h-4 w-4" /> Nueva partida
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-20 h-20 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-300 ${
              card.flipped || card.matched ? 'bg-purple-500' : 'bg-gray-300'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped || card.matched ? (
              <img src={card.image} alt="Pomerania" className="w-full h-full object-cover rounded-lg" />
            ) : (
              '?'
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        Poms encontrados: {matchedPairs} / {CARD_IMAGES.length}
      </div>
    </>
  )
}
