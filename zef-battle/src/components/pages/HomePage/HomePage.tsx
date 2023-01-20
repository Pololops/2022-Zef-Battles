import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useContext } from 'react'

import type { ReturnType } from '../../../apiClient/apiRequests';
import Cards from '../../Cards/Cards'

export default function HomePage() {
	const { data } = useLoaderData() as { data: ReturnType }

	return (
		<>
			<h2>Zef's Battles</h2>
			{ Array.isArray(data) ? <Cards data={data} /> : data }
		</>
	)
}
