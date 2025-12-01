# AnimalEC - Educational Animal Platform

## 1. Brief Description

AnimalEC is a full-stack web application designed to provide educational content about animals. The platform allows users to learn about different animal species, take quizzes to test their knowledge, and view expert information and sponsors. The application features a gamification system with user levels and points based on quiz performance.

The system includes administrative features for managing animals, questions, quizzes, experts, and sponsors, with role-based access control to ensure proper authorization.

## 2. Main Technologies

### Backend
- **Node.js** with **Express.js** - REST API server
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication and authorization
- **dotenv** - Environment variable management

### Frontend
- **Vue.js** - Progressive JavaScript framework
- **Vuex** - State management
- **Vue Router** - Client-side routing
- **Bootstrap** & **Bootstrap Vue** - UI components
- **Fetch API** - HTTP requests to backend

### Database
- **MongoDB** - NoSQL document database
- Collections: animals, users, user_levels, questions, quizzes, experts, sponsors

### Database Bootstrap
- **Automatic seeding system** - Populates database on first startup
- **Idempotent design** - Safe to run multiple times without duplicates
- **MongoDB export format handling** - Transforms $oid and $date formats
- **Environment-based configuration** - Flexible setup via .env file
- **Force reseed option** - Complete database reset capability

## 3. How to Execute the Project

### Prerequisites
- Node.js (v12 or higher)
- MongoDB (running locally or remote instance)
- npm (Node Package Manager)

### 3.1 Backend

1. Navigate to the backend directory:
```bash
cd MiniProj2-Back
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (optional):
```bash
copy .env.example .env
```
Edit `.env` if you need custom settings. Default values:
```
MONGO_URI=mongodb://localhost:27017/animalec
PORT=8080
HOST=0.0.0.0
FORCE_RESEED=false
```

4. Start the server:
```bash
npm start
```

The server will:
- Connect to MongoDB
- Automatically seed the database with sample data (if collections are empty)
- Start listening on port 8080

Expected output:
```
---Connected to DB
Starting database bootstrap...
✓ animals: 5 inserted, 0 updated
✓ users: 3 inserted, 0 updated
...
Database bootstrap completed!
Your app is listening on 8080
```

### 3.2 Frontend

1. Navigate to the frontend directory:
```bash
cd MiniProj2-Front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

The application will be available at `http://localhost:8081` (or the next available port).

## 4. New Features

### 4.1 Experts

The Experts module allows management of wildlife specialists and educational experts associated with the platform.

#### 4.1.1 Create Expert
- **Endpoint**: `POST /api/experts`
- **Authentication**: Required (Admin only)
- **Description**: Creates a new expert profile with name, specialty, email, institution, and bio
- **Request Body**:
```json
{
  "name": "Dr. Jane Smith",
  "specialty": "Marine Biology",
  "email": "jane.smith@example.com",
  "institution": "Ocean Research Institute",
  "bio": "Expert in marine wildlife conservation"
}
```
- **Response**: 201 Created with expert object

#### 4.1.2 Edit Expert
- **Endpoint**: `PUT /api/experts/:id`
- **Authentication**: Required (Admin only)
- **Description**: Updates an existing expert's information
- **Request Body**: Same as create (fields to update)
- **Response**: 200 OK with updated expert object

#### 4.1.3 Delete Expert
- **Endpoint**: `DELETE /api/experts/:id`
- **Authentication**: Required (Admin only)
- **Description**: Permanently removes an expert from the system
- **Response**: 200 OK with success message

#### Additional Expert Endpoints:
- `GET /api/experts` - List all experts (Auth required)
- `GET /api/experts/:id` - Get single expert details (Auth required)
- `PUT /api/experts/activate/:id` - Activate expert (Admin only)
- `PUT /api/experts/deactivate/:id` - Deactivate expert (Admin only)

### 4.2 Sponsors

The Sponsors module manages organizations and entities that sponsor or support specific animals on the platform.

#### 4.2.1 Create Sponsor
- **Endpoint**: `POST /api/sponsors`
- **Authentication**: Required (Admin only)
- **Description**: Creates a new sponsor associated with an animal
- **Request Body**:
```json
{
  "name": "Wildlife Foundation",
  "animal": "Leão",
  "website": "https://www.wildlifefoundation.org",
  "description": "Supporting lion conservation efforts"
}
```
- **Response**: 201 Created with sponsor object
- **Note**: Website and description are optional fields

#### 4.2.2 Edit Sponsor
- **Endpoint**: `PUT /api/sponsors/:id`
- **Authentication**: Required (Admin only)
- **Description**: Updates sponsor information
- **Request Body**: Same as create (fields to update)
- **Response**: 200 OK with updated sponsor object

#### 4.2.3 Delete Sponsor
- **Endpoint**: `DELETE /api/sponsors/:id`
- **Authentication**: Required (Admin only)
- **Description**: Permanently removes a sponsor from the system
- **Response**: 200 OK with success message

#### Additional Sponsor Endpoints:
- `GET /api/sponsors` - List all sponsors (Auth required)
- `GET /api/sponsors/:id` - Get single sponsor details (Auth required)
- `PUT /api/sponsors/activate/:id` - Activate sponsor (Admin only)
- `PUT /api/sponsors/deactivate/:id` - Deactivate sponsor (Admin only)

## 5. CRUD Demo

**Admin Menu**

![Admin-Menu](Docs\Screenshots\Admin-Menu.png)


### 5.1 Experts

The Experts feature only allows administrators to manage wildlife specialists and educational experts.

#### **List Experts**

**Normal User**

![User-ListExperts](Docs\Screenshots\User-ListExperts.png)

**Admin**

![User-ListExperts](Docs\Screenshots\Admin-ListExperts.png)

#### **Creating/Edit an Expert (Admin Required)**

**Prerequisites**: User must be logged in with admin privileges.

**Steps**:
1. Log in as an admin user
2. Navigate to Admin Panel
3. Click on "Especialistas" (Experts)
4. Click "Adicionar Especialista" button
5. Fill in the form:
   - Name (required)
   - Specialty (required)
   - Email (required)
   - Institution (optional)
   - Bio (optional)
6. Click "ADICIONAR" to create

![Admin-CreateExpert](Docs\Screenshots\Admin-CreateExpert.png)

**The new expert appears when listing**
![User-AfterCreateExpert](Docs\Screenshots\User-AfterCreateExpert.png)


#### **Deleting an Expert (Admin Required)**

**Steps**:
1. Navigate to Experts list
2. Click "Eliminar" button on the expert to remove
3. Confirm deletion in the dialog
4. Expert is permanently removed

![Admin-DeleteExpert](Docs\Screenshots\Admin-DeleteExpert.png)

![Admin-DeleteExpert](Docs\Screenshots\Admin-DeleteConfirm.png)

### 5.2 Sponsors

The Sponsors feature allows administrators to manage organizations supporting animal conservation.

#### **List Sponsors**

**Normal User**

![User-ListSponsors](Docs\Screenshots\User-ListSponsors.png)

**Admin**

![User-ListSponsors](Docs\Screenshots\Admin-ListSponsors.png)

#### **Creating/Editing a Sponsor (Admin Required)**

**Prerequisites**: User must be logged in with admin privileges.

**Steps**:
1. Log in as an admin user
2. Navigate to Admin Panel
3. Click on "Patrocinadores" (Sponsors)
4. Click "Adicionar Patrocinador" button
5. Fill in the form:
   - Name (required)
   - Animal (required)
   - Website (optional)
   - Description (optional)
6. Click "ADICIONAR" to create

![Admin-CreateSponsor](Docs\Screenshots\Admin-CreateSponsor.png)

**The new sponsor appears when listing**
![User-AfterCreateSponsor](Docs\Screenshots\User-AfterCreateSponsor.png)


#### **Deleting a Sponsor (Admin Required)**

**Steps**:
1. Navigate to Sponsors list
2. Click "Eliminar" button on the sponsor to remove
3. Confirm deletion in the dialog
4. Sponsor is permanently removed

![Admin-DeleteSponsor](Docs\Screenshots\Admin-DeleteSponsor.png)

![Admin-DeleteSponsor](Docs\Screenshots\Admin-DeleteSponsorConfirm.png)

---

## Additional Information

### User Roles
- **Admin**: Full access to all CRUD operations (create, edit, delete)
- **Normal User**: Read-only access, can view experts and sponsors but cannot modify

### Authentication
All API endpoints require authentication via JWT token. The token is obtained by logging in through the `/api/auth/signin` endpoint.

### Default Users (After Database Bootstrap)
#### **Admin**
**Username**: admin
**Password**: admin123

#### **Normal User**
**Username**: pedrocoches
**Password**: password

### Troubleshooting
- **Backend won't start**: Ensure MongoDB is running
- **No data in database**: Check console for bootstrap messages
- **403 Forbidden errors**: Ensure you're logged in with correct user role
- **CORS errors**: Verify backend URL is correctly configured in frontend
