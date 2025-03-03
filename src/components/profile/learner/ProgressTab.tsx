
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, User } from 'lucide-react';

const ProgressTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-orange-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-100">
          <CardTitle>Vue d'ensemble</CardTitle>
          <CardDescription>Votre progression d'apprentissage</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-orange-500" />
                Cours complétés
              </h3>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Progression globale</span>
                  <span className="text-orange-600 font-medium">45%</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-3">
                  <div className="bg-orange-600 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Développement Web Frontend</span>
                      <span className="text-orange-600">65%</span>
                    </div>
                    <div className="w-full bg-orange-200/70 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>UX/UI Design</span>
                      <span className="text-orange-600">25%</span>
                    </div>
                    <div className="w-full bg-orange-200/70 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Gestion de Projet Tech</span>
                      <span className="text-orange-600">0%</span>
                    </div>
                    <div className="w-full bg-orange-200/70 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-orange-500" />
                Compétences acquises
              </h3>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border border-orange-100 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">HTML avancé</span>
                </div>
                <div className="bg-white p-3 rounded border border-orange-100 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">CSS Flexbox</span>
                </div>
                <div className="bg-white p-3 rounded border border-orange-100 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">JavaScript fondamentaux</span>
                </div>
                <div className="bg-white p-3 rounded border border-orange-100 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">React composants</span>
                </div>
                <div className="bg-white p-3 rounded border border-orange-100 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">React Hooks (en cours)</span>
                </div>
                <div className="bg-white p-3 rounded border border-orange-100 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">UX fondamentaux (en cours)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-orange-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-100">
          <CardTitle>Prochaines étapes</CardTitle>
          <CardDescription>Recommandations personnalisées</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="p-3 border border-orange-100 rounded-lg">
              <h4 className="font-medium mb-1 flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-orange-500" />
                <span>Module: React Hooks</span>
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Continuez votre formation React
              </p>
              <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                Reprendre
              </Button>
            </div>
            
            <div className="p-3 border border-orange-100 rounded-lg">
              <h4 className="font-medium mb-1 flex items-center">
                <GraduationCap className="h-4 w-4 mr-1 text-orange-500" />
                <span>Parcours: UX Design</span>
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Élargissez vos compétences
              </p>
              <Button size="sm" variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
                Explorer
              </Button>
            </div>
            
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
              <h4 className="font-medium mb-2 text-orange-800">Mentor recommandé</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-orange-700" />
                </div>
                <div>
                  <p className="font-medium text-sm">Sophie Martin</p>
                  <p className="text-xs text-gray-600">Experte React & UX/UI</p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3 bg-orange-500 hover:bg-orange-600">
                Contacter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTab;
