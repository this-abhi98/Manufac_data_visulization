import React, { useEffect, useState } from 'react';
import { getMean, getMedian, getMode } from '../utils';
import wineDataSet from '../utils/wine-data-set';

import './wineDataAnalysis.css';

//Component to render wine data analysis table
const WineDataAnalysis = () => {
	const [classWiseStat, setClassWiseStat] = useState(null);

	useEffect(() => {
		splitClassWiseData();
	}, []);

	//Function is used split and store classwise Flavanoids data and gamma data.
	const splitClassWiseData = () => {
		let classWiseStat = {};
		//loop through every dataset in the array and store all Flavanoids data and gamma data in array to calculate mean, median,mode later
		for (let dataSet of wineDataSet) {
			if (classWiseStat[`class_${dataSet.Alcohol}`]) {
				let gamma = (dataSet.Ash * dataSet.Hue) / dataSet.Magnesium;
				let gammaListByClass = [...classWiseStat[`class_${dataSet.Alcohol}`].gammaListByClass, gamma];
				let flanoidsListByClass = [...classWiseStat[`class_${dataSet.Alcohol}`].flanoidsListByClass, dataSet.Flavanoids];
				classWiseStat[`class_${dataSet.Alcohol}`] = { flanoidsListByClass, gammaListByClass };
			} else {
				let gamma = (dataSet.Ash * dataSet.Hue) / dataSet.Magnesium;
				let gammaListByClass = [gamma];
				let flanoidsListByClass = [dataSet.Flavanoids];
				classWiseStat[`class_${dataSet.Alcohol}`] = { flanoidsListByClass, gammaListByClass };
			}
		}
		setClassWiseStat(classWiseStat);
	};

	return (
		<div className="WineDataAnalysis">
			<div className="FlanoidsAnalytics">
				<h3>Mean, Median, Mode of “Flavanoids”</h3>
				{classWiseStat && (
					<table border={1}>
						{classWiseStat && (
							<tr>
								<th>Measure</th>
								{Object.keys(classWiseStat).map((key, index) => (
									<th> {key}</th>
								))}
							</tr>
						)}
						<tr>
							<td>Flavanoids Mean</td>
							{Object.keys(classWiseStat).map((key, index) => (
								<th>{getMean(classWiseStat[key].flanoidsListByClass)}</th>
							))}
						</tr>
						<tr>
							<td>Flavanoids Median</td>
							{Object.keys(classWiseStat).map((key, index) => (
								<th> {getMedian(classWiseStat[key].flanoidsListByClass)}</th>
							))}
						</tr>
						<tr>
							<td>Flavanoids Mode</td>
							{Object.keys(classWiseStat).map((key, index) => (
								<th>{getMode(classWiseStat[key].flanoidsListByClass)}</th>
							))}
						</tr>
					</table>
				)}
			</div>
			<div className="GammaAnalytics">
				<h3>Mean, Median, Mode of “Gamma”</h3>
				{classWiseStat && (
					<table border={1}>
						{classWiseStat && (
							<tr>
								<th>Measure</th>
								{Object.keys(classWiseStat).map((key, index) => (
									<th> {key}</th>
								))}
							</tr>
						)}
						<tr>
							<td>Gamma Mean</td>
							{Object.keys(classWiseStat).map((key, index) => (
								<th>{getMean(classWiseStat[key].gammaListByClass)}</th>
							))}
						</tr>
						<tr>
							<td>Gamma Median</td>
							{Object.keys(classWiseStat).map((key, index) => (
								<th> {getMedian(classWiseStat[key].gammaListByClass)}</th>
							))}
						</tr>
						<tr>
							<td>Gamma Mode</td>
							{Object.keys(classWiseStat).map((key, index) => (
								<th>{getMode(classWiseStat[key].gammaListByClass)}</th>
							))}
						</tr>
					</table>
				)}
			</div>
		</div>
	);
};

export default WineDataAnalysis;
