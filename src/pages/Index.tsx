import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Recipe {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: string;
  category: string;
  ingredients: string[];
  instructions: string[];
}

const sampleRecipes: Recipe[] = [
  {
    id: 1,
    name: "Супергеройский смузи",
    calories: 250,
    protein: 15,
    carbs: 35,
    fat: 8,
    cookTime: "5 мин",
    category: "Завтрак",
    ingredients: ["Банан", "Шпинат", "Протеин", "Миндальное молоко", "Ягоды"],
    instructions: ["Смешать все ингредиенты", "Взбить в блендере", "Подавать холодным"]
  },
  {
    id: 2,
    name: "Черепашка пицца",
    calories: 320,
    protein: 18,
    carbs: 28,
    fat: 12,
    cookTime: "25 мин",
    category: "Обед",
    ingredients: ["Цельнозерновая основа", "Томатный соус", "Моцарелла", "Овощи", "Базилик"],
    instructions: ["Раскатать тесто", "Добавить соус и топпинги", "Запечь 15 минут"]
  },
  {
    id: 3,
    name: "Ниндзя салат",
    calories: 180,
    protein: 12,
    carbs: 15,
    fat: 9,
    cookTime: "10 мин",
    category: "Ужин",
    ingredients: ["Микс салатов", "Авокадо", "Семечки", "Оливковое масло", "Лимон"],
    instructions: ["Нарезать овощи", "Смешать заправку", "Перемешать все ингредиенты"]
  }
];

function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = ['Все', 'Завтрак', 'Обед', 'Ужин', 'Перекус'];
  
  const filteredRecipes = sampleRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-turtle-green/10 to-turtle-orange/10">
      {/* Header */}
      <header className="bg-turtle-green comic-border shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-black text-white comic-text-shadow">
                NINJA NUTRITION
              </div>
              <div className="text-xl text-turtle-yellow">🥷🥗</div>
            </div>
            <nav className="hidden md:flex space-x-6">
              {['Главная', 'Услуги', 'Рецепты', 'Отзывы', 'Обо мне', 'Консультации', 'Контакты', 'Блог'].map((item) => (
                <button key={item} className="text-white hover:text-turtle-yellow transition-colors font-medium">
                  {item}
                </button>
              ))}
            </nav>
            <Button className="md:hidden comic-button">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-6xl font-black text-turtle-dark comic-text-shadow mb-6 animate-comic-bounce">
                КОВАBUNGA!
              </h1>
              <h2 className="text-3xl font-bold text-turtle-green mb-4">
                Супергеройское питание для настоящих ниндзя!
              </h2>
              <p className="text-xl text-turtle-dark mb-8">
                Откройте секреты здорового питания вместе с профессиональным нутрициологом. 
                Станьте сильнее, быстрее и здоровее!
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="comic-button bg-turtle-green hover:bg-turtle-green/90">
                  <Icon name="Calendar" className="mr-2" size={20} />
                  Записаться на консультацию
                </Button>
                <Button className="comic-button bg-turtle-orange hover:bg-turtle-orange/90">
                  <Icon name="BookOpen" className="mr-2" size={20} />
                  Изучить рецепты
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/img/689c2ce5-eaf5-4096-aab3-302b4dad5289.jpg" 
                alt="Ninja Nutritionist" 
                className="max-w-md w-full comic-border animate-comic-pop"
              />
            </div>
          </div>
        </section>

        {/* Recipe Database Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-turtle-dark comic-text-shadow mb-4">
              БАЗА СУПЕРГЕРОЙСКИХ РЕЦЕПТОВ
            </h2>
            <p className="text-xl text-turtle-dark">
              Найдите идеальные рецепты с точным расчетом калорий и БЖУ
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4 items-center justify-center">
              <div className="relative max-w-md w-full">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-turtle-dark" size={20} />
                <Input 
                  placeholder="Поиск рецептов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 comic-border"
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-center flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "comic-button" : "comic-border bg-white hover:bg-turtle-green/10"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="comic-border hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-turtle-dark">{recipe.name}</CardTitle>
                    <Badge className="bg-turtle-orange text-white">{recipe.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-turtle-dark">
                    <Icon name="Clock" size={16} />
                    {recipe.cookTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-turtle-green/10 rounded-lg">
                      <div className="text-2xl font-bold text-turtle-green">{recipe.calories}</div>
                      <div className="text-sm text-turtle-dark">ккал</div>
                    </div>
                    <div className="text-center p-3 bg-turtle-orange/10 rounded-lg">
                      <div className="text-lg font-bold text-turtle-orange">
                        Б{recipe.protein} Ж{recipe.fat} У{recipe.carbs}
                      </div>
                      <div className="text-sm text-turtle-dark">граммы</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full comic-button bg-turtle-yellow text-turtle-dark hover:bg-turtle-yellow/90"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <Icon name="Eye" className="mr-2" size={16} />
                    Посмотреть рецепт
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Preview */}
        <section className="mb-16">
          <h2 className="text-4xl font-black text-turtle-dark comic-text-shadow text-center mb-8">
            СУПЕРГЕРОЙСКИЕ УСЛУГИ
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "UserCheck", title: "Персональные консультации", desc: "Индивидуальный план питания" },
              { icon: "BarChart3", title: "Анализ питания", desc: "Полная диагностика рациона" },
              { icon: "Trophy", title: "Программы похудения", desc: "Достигайте целей как ниндзя" }
            ].map((service, index) => (
              <Card key={index} className="comic-border text-center hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-turtle-green rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-turtle-dark">{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-turtle-dark comic-border p-8 mb-16">
          <h2 className="text-3xl font-black text-white comic-text-shadow mb-4">
            ГОТОВЫ СТАТЬ СУПЕРГЕРОЕМ ПИТАНИЯ?
          </h2>
          <p className="text-turtle-yellow text-xl mb-6">
            Запишитесь на консультацию и получите персональный план питания!
          </p>
          <Button className="comic-button bg-turtle-orange hover:bg-turtle-orange/90 text-xl px-8 py-4">
            <Icon name="Zap" className="mr-2" size={24} />
            ПОЕХАЛИ!
          </Button>
        </section>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRecipe(null)}>
          <Card className="comic-border max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold text-turtle-dark">{selectedRecipe.name}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(null)}>
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-turtle-green/10 rounded-lg">
                  <div className="text-xl font-bold text-turtle-green">{selectedRecipe.calories}</div>
                  <div className="text-sm">ккал</div>
                </div>
                <div className="text-center p-3 bg-turtle-orange/10 rounded-lg">
                  <div className="text-xl font-bold text-turtle-orange">{selectedRecipe.protein}г</div>
                  <div className="text-sm">белки</div>
                </div>
                <div className="text-center p-3 bg-turtle-yellow/10 rounded-lg">
                  <div className="text-xl font-bold text-turtle-yellow">{selectedRecipe.carbs}г</div>
                  <div className="text-sm">углеводы</div>
                </div>
                <div className="text-center p-3 bg-turtle-dark/10 rounded-lg">
                  <div className="text-xl font-bold text-turtle-dark">{selectedRecipe.fat}г</div>
                  <div className="text-sm">жиры</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-turtle-dark mb-2">Ингредиенты:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-turtle-dark">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-turtle-dark mb-2">Приготовление:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-turtle-dark">{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-turtle-dark text-white p-8 mt-16">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4 comic-text-shadow">NINJA NUTRITION</div>
          <p className="text-turtle-yellow mb-4">Ваш путь к здоровому питанию начинается здесь!</p>
          <div className="flex justify-center space-x-6">
            <Icon name="Instagram" size={24} className="hover:text-turtle-orange cursor-pointer transition-colors" />
            <Icon name="Facebook" size={24} className="hover:text-turtle-orange cursor-pointer transition-colors" />
            <Icon name="MessageCircle" size={24} className="hover:text-turtle-orange cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;