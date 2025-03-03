
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Beaker } from 'lucide-react';

const LabsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Laboratoires pratiques</CardTitle>
        <CardDescription>Mettez en pratique vos connaissances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-100 shadow-sm">
            <div className="mb-4">
              <Beaker className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-lg">Projet Web Personnel</h3>
              <p className="text-sm text-gray-600 mt-1">
                Créez votre portfolio en ligne en utilisant HTML, CSS et JavaScript.
              </p>
            </div>
            <div className="bg-white/80 p-3 rounded-md mb-4 border border-orange-100">
              <p className="text-sm">
                <span className="font-medium">Compétences:</span> HTML, CSS, JavaScript, Responsive Design
              </p>
            </div>
            <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
              Commencer le projet
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-100 shadow-sm">
            <div className="mb-4">
              <Beaker className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-lg">Application React</h3>
              <p className="text-sm text-gray-600 mt-1">
                Développez une application de liste de tâches avec React et Firebase.
              </p>
            </div>
            <div className="bg-white/80 p-3 rounded-md mb-4 border border-orange-100">
              <p className="text-sm">
                <span className="font-medium">Compétences:</span> React, État, Props, Hooks, Firebase
              </p>
            </div>
            <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
              Commencer le projet
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-100 shadow-sm">
            <div className="mb-4">
              <Beaker className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-lg">Design UI Responsive</h3>
              <p className="text-sm text-gray-600 mt-1">
                Concevez une interface utilisateur pour une application mobile fictive.
              </p>
            </div>
            <div className="bg-white/80 p-3 rounded-md mb-4 border border-orange-100">
              <p className="text-sm">
                <span className="font-medium">Compétences:</span> UI Design, Figma, Responsive Design
              </p>
            </div>
            <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
              Commencer le projet
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-100 shadow-sm">
            <div className="mb-4">
              <Beaker className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-lg">API RESTful</h3>
              <p className="text-sm text-gray-600 mt-1">
                Intégrez une API externe dans votre application web.
              </p>
            </div>
            <div className="bg-white/80 p-3 rounded-md mb-4 border border-orange-100">
              <p className="text-sm">
                <span className="font-medium">Compétences:</span> APIs REST, Fetch, Async/Await, JSON
              </p>
            </div>
            <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
              Commencer le projet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabsTab;
