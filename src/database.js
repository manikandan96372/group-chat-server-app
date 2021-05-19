import mongoose from 'mongoose';

const connect = (DB_URL) => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(DB_URL);
    mongoose.connection.on('error', err => {
        console.error(err);
        console.log(
            'MongoDB connection failed: ' + DB_URL
        );
        process.exit();
    });
}

const close = () => {
    mongoose.connection.close();
}

export { connect, close };