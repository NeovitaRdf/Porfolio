import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../hooks/use-toast';
import { Palette, Save } from 'lucide-react';

const SiteSettings = () => {
  const { theme, updateTheme } = useTheme();
  const { toast } = useToast();
  const [colors, setColors] = useState({
    primaryColor: theme.primaryColor || '#991b1b',
    secondaryColor: theme.secondaryColor || '#0a0a0a',
    accentColor: theme.accentColor || '#7f1d1d'
  });

  const handleColorChange = (key, value) => {
    setColors({ ...colors, [key]: value });
  };

  const handleSave = () => {
    updateTheme(colors);
    toast({
      title: 'Settings Saved!',
      description: 'Theme colors have been updated successfully.',
    });
  };

  const presetThemes = [
    { name: 'Dark Red (Default)', primary: '#991b1b', secondary: '#0a0a0a', accent: '#7f1d1d' },
    { name: 'Deep Blue', primary: '#1e3a8a', secondary: '#0a0a0a', accent: '#1e40af' },
    { name: 'Dark Teal', primary: '#115e59', secondary: '#0a0a0a', accent: '#0f766e' },
    { name: 'Charcoal', primary: '#404040', secondary: '#0a0a0a', accent: '#525252' },
    { name: 'Purple', primary: '#7e22ce', secondary: '#0a0a0a', accent: '#6b21a8' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Site Settings</h1>
      <p className="text-gray-400 mb-8">Customize your portfolio's appearance and theme colors</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Theme Colors */}
        <Card className="bg-neutral-900 border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Palette className="mr-2 h-6 w-6 text-red-500" />
              Theme Colors
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="primaryColor" className="text-white mb-2 block">Primary Color</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={colors.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={colors.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="flex-1 bg-black border-gray-800 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondaryColor" className="text-white mb-2 block">Secondary Color</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={colors.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={colors.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="flex-1 bg-black border-gray-800 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accentColor" className="text-white mb-2 block">Accent Color</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="accentColor"
                    type="color"
                    value={colors.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={colors.accentColor}
                    onChange={(e) => handleColorChange('accentColor', e.target.value)}
                    className="flex-1 bg-black border-gray-800 text-white"
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full bg-red-700 hover:bg-red-800 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Theme
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preset Themes */}
        <Card className="bg-neutral-900 border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Preset Themes</h2>
            <div className="space-y-4">
              {presetThemes.map((preset) => (
                <div
                  key={preset.name}
                  className="p-4 bg-black border border-gray-800 rounded-lg hover:border-red-900 transition-colors cursor-pointer"
                  onClick={() => setColors({
                    primaryColor: preset.primary,
                    secondaryColor: preset.secondary,
                    accentColor: preset.accent
                  })}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{preset.name}</h3>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.primary }}></div>
                      <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.accent }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettings;