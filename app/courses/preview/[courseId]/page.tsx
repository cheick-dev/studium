// import Image from "next/image";
// import Link from "next/link";
// import { Book, Clock, Users } from "lucide-react";

// // Définition du type pour les données du cours
// interface CoursePreviewProps {
// 	id: string;
// 	titre: string;
// 	description: string;
// 	imageUrl: string;
// 	duree: number; // durée en heures
// 	nombreEtudiants: number;
// 	difficulte: "Débutant" | "Intermédiaire" | "Avancé";
// 	professeur: {
// 		nom: string;
// 		avatar: string;
// 	};
// }

// const CoursePreview = ({
//     params
//   }: {
//     params: { courseId: string }
//   }) => {
// 	// Fonction pour obtenir la couleur de difficulté
// 	const getDifficulteColor = (niveau: string) => {
// 		switch (niveau) {
// 			case "Débutant":
// 				return "bg-green-100 text-green-800";
// 			case "Intermédiaire":
// 				return "bg-yellow-100 text-yellow-800";
// 			case "Avancé":
// 				return "bg-red-100 text-red-800";
// 		}
// 	};

// 	return (
// 		<div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
// 			{/* Image du cours */}
// 			<div className="relative h-48 w-full">
// 				<Image
// 					src={imageUrl}
// 					alt={titre}
// 					fill
// 					className="object-cover"
// 					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// 				/>
// 			</div>

// 			{/* Contenu du cours */}
// 			<div className="p-6">
// 				{/* Titre et description */}
// 				<div className="mb-4">
// 					<h2 className="text-xl font-bold text-gray-800 mb-2">
// 						{titre}
// 					</h2>
// 					<p className="text-gray-600 text-sm line-clamp-3">
// 						{description}
// 					</p>
// 				</div>

// 				{/* Statistiques du cours */}
// 				<div className="flex items-center justify-between mb-4">
// 					{/* Durée */}
// 					<div className="flex items-center text-sm text-gray-600">
// 						<Clock className="w-4 h-4 mr-2" />
// 						{duree} heures
// 					</div>

// 					{/* Nombre d'étudiants */}
// 					<div className="flex items-center text-sm text-gray-600">
// 						<Users className="w-4 h-4 mr-2" />
// 						{nombreEtudiants} étudiants
// 					</div>

// 					{/* Niveau de difficulté */}
// 					<span
// 						className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficulteColor(
// 							difficulte
// 						)}`}
// 					>
// 						{difficulte}
// 					</span>
// 				</div>

// 				{/* Professeur */}
// 				<div className="flex items-center border-t pt-4">
// 					<Image
// 						src={professeur.avatar}
// 						alt={professeur.nom}
// 						width={40}
// 						height={40}
// 						className="rounded-full mr-3"
// 					/>
// 					<span className="text-sm font-medium text-gray-700">
// 						{professeur.nom}
// 					</span>
// 				</div>

// 				{/* Bouton pour voir le cours */}
// 				<Link
// 					href={`/cours/${id}`}
// 					className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
// 				>
// 					Voir le cours
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default CoursePreview;

// // Exemple d'utilisation dans une page ou un autre composant
// export const ExempleUtilisation = () => {
// 	const coursExemple: CoursePreviewProps = {
// 		id: "1",
// 		titre: "Introduction à Next.js 14",
// 		description:
// 			"Apprenez les bases de Next.js 14 et créez des applications web modernes et performantes avec React.",
// 		imageUrl: "/images/nextjs-course.jpg",
// 		duree: 6,
// 		nombreEtudiants: 1250,
// 		difficulte: "Intermédiaire",
// 		professeur: {
// 			nom: "Jean Dupont",
// 			avatar: "/images/professeurs/jean-dupont.jpg",
// 		},
// 	};

// 	return <CoursePreview {...coursExemple} />;
// };
