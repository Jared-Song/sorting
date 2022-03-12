import React from 'react';
// import * as sortingAlgorithms from './sortingAlgorithms/sortingalgorithms';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingalgorithms.js';
import './SortingVisualiser.css';

const ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 310;


export default class SortingVisualiser extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			array: [],
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
			array.push(randomIntFromInterval(5, 600));
		}
		this.setState({ array });
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		
		// for (const animation of animations) {
		// 	newAnimations.push(animation.comparison);
		// 	newAnimations.push(animation.comparison);
		// 	newAnimations.push(animation.swap);
		// }
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColourChange = i % 3 !== 2;
			if (isColourChange) {
				const [barOneIndex, barTwoIndex] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const colour = i % 3 === 0 ? 'red' : 'turquoise';
				setTimeout(() => {
					barOneStyle.backgroundColor = colour;
					barTwoStyle.backgroundColor = colour;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					const [barOneIndex, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIndex].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		// const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
		// const sortedArray = sortingAlgorithms.mergeSort(this.state.array);
		// console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
	}

	quickSort() { }

	heapSort() { }

	bubbleSort() { }

	testSortingAlgorithms() {
		for (let i = 0; i < 100; i++) {
			const array = [];
			const length = randomIntFromInterval(1, 1000);
			for (let j = 0; j < length; j++) {
				array.push(randomIntFromInterval(-1000, 1000));
			}
			const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
			const mergeSortedArray = getMergeSortAnimations(array.slice());
			// // console.log(sortedArray);
			// // console.log(javaScriptSortedArray);
			console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
		}
	}

	render() {
		const { array } = this.state;

		return (
			<div className="array-container">
				{array.map((value, idx) => (
					<div
						className="array-bar"
						key={idx}
						style={{ height: `${value}px` }}></div>
				))}
				<button onClick={() => this.resetArray()}>Generate New Array</button>
				<button onClick={() => this.mergeSort()}>Merge Sort</button>
				<button onClick={() => this.quickSort()}>Quick Sort</button>
				<button onClick={() => this.heapSort()}>Heap Sort</button>
				<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
				<button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) return false;
	}
	return true;
}