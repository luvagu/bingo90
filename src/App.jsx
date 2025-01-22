import { useState } from 'react'

const BINGO_SIZE = 90

const classNames = (...classes) => classes.filter(Boolean).join(' ')

function numberArray(a) {
	const b = []

	while (a--) {
		b[a] = a + 1
	}

	return b
}

function fisherYates(arr) {
	const array = [...arr]
	let count = array.length
	let randomnumber
	let temp

	while (count) {
		randomnumber = (Math.random() * count--) | 0
		temp = array[count]
		array[count] = array[randomnumber]
		array[randomnumber] = temp
	}

	return array
}

const shuffeldNumbersArray = fisherYates(numberArray(BINGO_SIZE))

function App() {
	const [shuffeldNumbersRange, setShuffeldNumbersRange] =
		useState(shuffeldNumbersArray)
	const [poppedNumbersHistory, setPoppedNumbersHistory] = useState([])
	const [popedNums, setPopedNums] = useState([])

	const handleNumberPopping = isDoubleSelect => {
		const len = isDoubleSelect ? 2 : 1
		const shuffeldNumbersRangeCopy = [...shuffeldNumbersRange]
		const popedItems = []

		for (let counter = 0; counter < len; counter++) {
			popedItems.push(shuffeldNumbersRangeCopy.pop())
		}

		setShuffeldNumbersRange(shuffeldNumbersRangeCopy)
		setPopedNums(popedItems)
		setPoppedNumbersHistory(prevNums => [...prevNums, ...popedItems])
	}

	const handleResetGame = () => {
		setShuffeldNumbersRange(fisherYates(numberArray(BINGO_SIZE)))
		setPoppedNumbersHistory([])
		setPopedNums([])
	}

	const showButtons = shuffeldNumbersRange.length

	return (
		<main className='container mx-auto space-y-4 max-w-screen-sm'>
			<h1 className='text-center font-bold text-xl'>BINGO 90</h1>
			{showButtons ? (
				<div className='flex items-center justify-center gap-4'>
					<button
						type='button'
						onClick={() => handleNumberPopping(false)}
						className='bg-sky-500 hover:bg-sky-700 px-4 py-2 text-sm leading-5 rounded-full font-semibold text-white'
					>
						Sortear 1
					</button>
					{popedNums.map(num => (
						<div
							key={num}
							className='bg-green-700 text-white w-9 h-9 inline-flex items-center justify-center rounded-full'
						>
							{num}
						</div>
					))}
					<button
						type='button'
						onClick={() => handleNumberPopping(true)}
						className='bg-sky-500 hover:bg-sky-700 px-4 py-2 text-sm leading-5 rounded-full font-semibold text-white'
					>
						Sortear 2
					</button>
				</div>
			) : (
				<button
					type='button'
					onClick={handleResetGame}
					className='flex bg-gray-500 hover:bg-gray-700 px-4 py-2 text-sm leading-5 rounded-full font-semibold text-white mx-auto'
				>
					Resetear juego
				</button>
			)}

			<div className='grid grid-cols-[repeat(20,_minmax(0,_1fr))] rounded border border-gray-400 gap-1 divide-x divide-solid divide-gray-400 min-h-[18px]'>
				{poppedNumbersHistory.slice(-20).map(num => (
					<div key={num} className='text-xs text-center'>
						{num}
					</div>
				))}
			</div>

			<div className='grid grid-cols-10 gap-2 justify-items-center'>
				{Array(BINGO_SIZE)
					.fill()
					.map((_, index) => {
						const number = index + 1
						const isRevealed = poppedNumbersHistory.includes(number)
						return (
							<div
								key={index}
								className={classNames(
									'w-9 h-9 inline-flex items-center justify-center rounded-full',
									isRevealed
										? 'bg-green-700 text-white shadow'
										: 'bg-gray-300 text-gray-400 shadow-inner'
								)}
							>
								{number}
							</div>
						)
					})}
			</div>
		</main>
	)
}

export default App
