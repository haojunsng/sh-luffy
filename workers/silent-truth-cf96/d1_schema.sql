CREATE TABLE subscribers (
    email TEXT PRIMARY KEY,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_unsubscribed BOOLEAN DEFAULT 0,
    unsubscribed_at TIMESTAMP NULL
);
