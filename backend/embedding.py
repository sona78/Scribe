import os
import getpass

os.environ["PINECONE_API_KEY"] = "7bd278db-766f-4978-a090-4b8b01973196"
os.environ["PINECONE_ENV"] = "gcp-starter"
os.environ["OPENAI_API_KEY"] = "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" # NOTE Do we need a more expensive key? 

from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.document_loaders import TextLoader
from langchain.document_loaders import TextLoader

import pinecone

# initialize pinecone
pinecone.init(
    api_key=os.getenv("PINECONE_API_KEY"),  # find at app.pinecone.io
    environment=os.getenv("PINECONE_ENV"),  # next to api key in console
)

def createIndex(): 
    # Wherever we're storing the documents for text 
    loader = TextLoader("./andromious.txt")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    index_name = "scribe"

    # First, check if our index already exists. If it doesn't, we create it
    if index_name not in pinecone.list_indexes():
        # we create a new index
        pinecone.create_index(
        name=index_name,
        metric='cosine',
        dimension=1536  
    )

    # The OpenAI embedding model `text-embedding-ada-002 uses 1536 dimensions`
    docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name)

    return docsearch; 

def findSimilarDocs(query, index_name = "scribe"): 
    embeddings = OpenAIEmbeddings()

    # if you already have an index, you can load it like this
    docsearch = Pinecone.from_existing_index(index_name, embeddings)

    docs = docsearch.similarity_search(query)
    print(docs)

def addToIndex(text, index_name): 

    # Add Text to Existing Index 
    index = pinecone.Index(index_name)
    vectorstore = Pinecone(index, embeddings.embed_query, "text")

    vectorstore.add_texts(text)