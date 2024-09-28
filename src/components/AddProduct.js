import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {Label} from "@/components/ui/label"

export default function AddProduct() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedFile) {
            setError('Please select an image first.');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=4c2bd0059dfad5d914592764b3fea53b', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setImageUrl(data.data.url);
        } catch (err) {
            setError('Failed to upload image. Please try again.');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div >
            <Label htmlFor="picture">Product Name</Label>
            <Input className="mb-3" type="text"/>
            <Label htmlFor="picture">Price</Label>
            <Input className="mb-3" type="text"/>
            <Label htmlFor="picture">Description</Label>
            <Input className="mb-3" type="text"/>
            <Label htmlFor="picture">Cateogary</Label>
            <Select >
                <SelectTrigger className="w-[180px] mb-3">
                    <SelectValue placeholder="Cateogary" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="0">Electronics</SelectItem>
                    <SelectItem value="1">Accesories</SelectItem>
                    <SelectItem value="2">Clothing</SelectItem>
                    <SelectItem value="3">Furniture</SelectItem>
                    <SelectItem value="4">Food</SelectItem>
                </SelectContent>
            </Select>
            <Label  htmlFor="picture">Quantity</Label>
            <Input className="mt-3 mb-3" type="text" />
            
            <Label  htmlFor="picture">Image</Label>
            <Input type="file" onChange={handleFileChange} accept="image/*" />
            <Button className="mt-3" variant="outline" onClick={uploadImage} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Product Image'}
            </Button>
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}