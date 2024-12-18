// import Link from "next/link";
// import { db } from "@/lib/db";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FileText, Video } from "lucide-react";

// export default async function Home() {
//   const featuredCourses = await db.course.findMany({
//     take: 3,
//     orderBy: {
//       createdAt: "desc"
//     },
//     include: {
//       teacher: true
//     }
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Hero Section */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="max-w-3xl mx-auto text-center">
//           <h1 className="text-5xl font-bold mb-6">Plateforme d&apos;Apprentissage en Ligne</h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Découvrez une nouvelle façon d&apos;apprendre avec nos cours en ligne.
//             Apprenez à votre rythme avec nos experts qualifiés.
//           </p>
//           <div className="flex gap-4 justify-center">
//             <Button asChild size="lg">
//               <Link href="/auth/login">Se Connecter</Link>
//             </Button>
//             <Button asChild size="lg" variant="outline">
//               <Link href="/auth/register">Créer un Compte</Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Featured Courses Section */}
//       <div className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12">Cours à la Une</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {featuredCourses.map((course) => (
//             <Card key={course.id} className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle className="line-clamp-2">{course.title}</CardTitle>
//                 <CardDescription className="text-sm">
//                   Par {course.teacher.name || "Instructeur"}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
//                 <div className="flex items-center gap-4 mb-4">
//                   {course.videoUrl && (
//                     <div className="flex items-center text-blue-600">
//                       <Video className="h-4 w-4 mr-1" />
//                       <span className="text-sm">Vidéo</span>
//                     </div>
//                   )}
//                   {course.pdfUrl && (
//                     <div className="flex items-center text-red-600">
//                       <FileText className="h-4 w-4 mr-1" />
//                       <span className="text-sm">PDF</span>
//                     </div>
//                   )}
//                 </div>
//                 <Button asChild className="w-full">
//                   <Link href={`/courses/${course.id}`}>Voir le Cours</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="text-center mt-12">
//           <Button asChild size="lg" variant="outline">
//             <Link href="/auth/register">Voir Tous les Cours</Link>
//           </Button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center p-6">
//             <h3 className="text-xl font-bold mb-4">Apprentissage Flexible</h3>
//             <p className="text-gray-600">Apprenez à votre rythme, où que vous soyez</p>
//           </div>
//           <div className="text-center p-6">
//             <h3 className="text-xl font-bold mb-4">Experts Qualifiés</h3>
//             <p className="text-gray-600">Des instructeurs expérimentés et passionnés</p>
//           </div>
//           <div className="text-center p-6">
//             <h3 className="text-xl font-bold mb-4">Contenu de Qualité</h3>
//             <p className="text-gray-600">Des cours structurés et du matériel pédagogique varié</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
	const { data: session } = useSession();
	const user = session?.user;
	if (user) {
		redirect("/dashboard");
	}
	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
								Bienvenue sur notre plateforme d'apprentissage
							</h1>
							<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
								Découvrez nos cours en ligne et développez vos
								compétences avec nos experts.
							</p>
						</div>
						<div className="space-x-4">
							<Button asChild size="lg">
								<Link href="/courses">Découvrir les cours</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/dashboard">
									Commencer gratuitement
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
