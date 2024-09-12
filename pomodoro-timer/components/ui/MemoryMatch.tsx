"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Shuffle, X, CircleHelp } from "lucide-react"

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
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const allPairsFound = matchedPairs === CARD_IMAGES.length

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>¡Juega con Pom!</Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative">
            <button 
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900" 
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center whitespace-nowrap">
              <h2 className="text-2xl font-semibold mb-4 justify-center">¡Entrena tu memoria!</h2>
              <div className="flex align-middle justify-start">
              <Button size="sm justify-end flex" onClick={initializeGame}>
                <Shuffle className="mr-2 h-4 w-4 text-center flex flex-col" /> Nueva partida
              </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`w-20 h-20 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-200 ${
                    card.flipped || card.matched ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {card.flipped || card.matched ? (
                    <img src={card.image} alt="Pomerania" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <CircleHelp className="text-[#815ef3]"/>
                  )}
                </div>
              ))}
            </div>

            <div className={`mt-4 text-center ${allPairsFound ? 'animate-pulse text-[#eeac6d] text-lg' : ''}`}>
              Poms encontrados: {matchedPairs} / {CARD_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
